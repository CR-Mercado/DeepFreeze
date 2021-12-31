#' Deep Freeze Simulations 
#' 
#' Simulating discount rates in a simple agent based model

# Initiate protocol parameters & sample Vaults ----
{
set.seed(4) 
deposit_amount = 10 # eth
deposit_time = 2 # years 
penalty = .2 # 20% upfront fee added to vault unlock cost
breakeven = .66 # Fee erodes over the first 66% of time passed, then profit
n = 10 # number of vaults to include 
today <- Sys.Date() + 100 # assess redemption cost across different todays 

vaults <- data.frame(vault_id = paste0("A",1:n))
vaults$deposit_amount <- runif(n, min = 1, max = 20)
vaults$deposit_time <- runif(n, min = 0.1, max = 3)
vaults$deposit_date <- sample(x = seq.Date(from = Sys.Date() - 100,
                                           to =  Sys.Date(),
                                           by = "day"), 
                              size = n, replace = TRUE)


}

# Set up Vaults & Calculate today's redemption cost ----
initiative_vault <- function(vaults, penalty, breakeven){ 
  
  vault <- function(deposit_amount, deposit_time, penalty, breakeven){
    
    mint_freeth <- function(deposit_amount, deposit_time){
      stopifnot(deposit_amount > 0, deposit_time > 0)
      
      deposit_amount * deposit_time
    }
    
    freeth_minted <- mint_freeth(deposit_amount, deposit_time)
    unlock_cost <- (1 + penalty) * freeth_minted
    breakeven_time <- breakeven * deposit_time
    
   data.frame(
      freeth_minted = freeth_minted,
      unlock_cost = unlock_cost,
      breakeven_time = breakeven_time
      
    )
    
  }
  
  cbind(vaults, 
        do.call(what = rbind,
                args =  apply(vaults, MARGIN = 1, FUN = function(x){ 
                  vault( as.numeric(x[2]), as.numeric(x[3]),
                         penalty = penalty,
                         breakeven = breakeven ) 
                }) 
        )
  )
}

calc_redeem <- function(user_vault, today){ 
  
  expiration_date <- user_vault$deposit_date + user_vault$deposit_time*365
  breakeven_date <- user_vault$deposit_date + user_vault$breakeven_time*365
  
  # if the breakeven_date hasn't passed, only paying penalty
  if(today <= breakeven_date){
    potential_redeemable <- user_vault$unlock_cost - user_vault$freeth_minted
    percent_expired <- { 
      as.numeric(today - user_vault$deposit_date) / 
        as.numeric(breakeven_date - user_vault$deposit_date) 
    }
    
    new_unlock_cost <- user_vault$unlock_cost - 
      percent_expired*potential_redeemable
    
    # should never happen since breakeven is checked upfront
    if(new_unlock_cost <= 0){ 
      new_unlock_cost <- 0
    }
    
    # discount unlock cost by penalty redeemed
    return( new_unlock_cost )
    
    # otherwise, rapidly receiving fruits of your patience  
  } else { 
    potential_redeemable <- user_vault$freeth_minted
    percent_expired <- { 
      as.numeric(today - breakeven_date) / 
        as.numeric(expiration_date - breakeven_date) 
    }
    
    new_unlock_cost <- user_vault$freeth_minted - percent_expired*potential_redeemable
    
    if(new_unlock_cost <= 0){ 
      new_unlock_cost <- 0
    }
    
    return(new_unlock_cost)
    
  }
  
}

# Single Instance ----

library(ggplot2)

penalty_fee = 0.2 
amount = 10
penalty = (1+penalty_fee)*amount
time = 365 # days 
breakeven = ceiling(.66 * time)

slope_penalty <- (P - amount)/breakeven
slope_gain <- amount / (time - breakeven)

x = data.frame(day = 1:time, cost = rep(NA,time))

x$cost[1:breakeven] <- penalty - (1:breakeven)*slope_penalty
x$cost[(breakeven+1):time] <- amount - ( 1:(time-breakeven) )*slope_gain

loss = data.frame(x = c(1,1,breakeven), y = c(penalty,amount,amount), status = "LOSS")
profit = data.frame(x = c(breakeven,breakeven,time), y = c(amount,0,0), status = "PROFIT")

gg <- ggplot(data = x) + aes(x = day, y = cost) + 
  geom_line(size = 2) + 
  theme_classic() + 
  theme(axis.text = element_text(size = rel(1.5)),
        axis.title = element_text(size = rel(1.5))
  ) + 
  xlab("Days Since Lock") + 
  ylab("Cost to Unlock (frETH)") + 
  ylim(c(0,15)) + 
  geom_polygon(data = loss, aes(x = x, y = y),  fill = "red") + 
  geom_polygon(data = profit, aes(x = x, y = y), fill = "blue") + 
  geom_point(data = data.frame(x = breakeven, y = amount), aes(x = x, y = y), size = 5)

#pdf(file = "freeth_payoff.pdf", width = 8, height = 8)
#gg
#dev.off()




# Begin Simulation ----

user_vaults <- initiative_vault(vaults, penalty, breakeven)
user_vaults$today_unlock_cost <- rep(0, nrow(user_vaults))

for(i in 1:nrow(user_vaults)){ 
  user_vaults$today_unlock_cost[i] <- calc_redeem( user_vaults[i, ], today = today )  
}

user_vaults
