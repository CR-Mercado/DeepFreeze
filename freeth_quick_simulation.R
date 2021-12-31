set.seed(4)

n = 10000

random_id <- function(){
  paste0(collapse = "",
  sample(x = c(LETTERS, 0:9),size = 10,replace = TRUE)
  )
}

initial_vaults <- data.frame(
  vault = replicate(n = n, random_id()),
  deposit = abs(ceiling(rnorm(n)*10)) + 1,
  time = abs(ceiling(rnorm(n))) + 1
)

initial_vaults$mint <- initial_vaults$deposit*initial_vaults$time

initial_vaults$initial_cost <- initial_vaults$mint*1.2 
initial_vaults$breakeven_time <- initial_vaults$time * .67

initial_vaults$halfway_cost <- initial_vaults$mint*1.1
initial_vaults$threequarter_cost <- initial_vaults$deposit*0.5

progress <- c("halfway","breakeven","mostly","completer")

initial_vaults$progress <- sample(x = progress, 
                                  size = n,
                                  replace = TRUE,
                                  prob = c(0.35,
                                           0.05,
                                           0.25,
                                           0.35) )

vault_check <- function(vault_row){
  
  minted = vault_row$mint
  
 cost_to_withdraw <- switch(vault_row$progress, 
        halfway = vault_row$halfway_cost,
        breakeven = vault_row$mint,
        mostly = vault_row$threequarter_cost,
        completer = 0
        )
  
 supply = minted - cost_to_withdraw 
 
 return(supply)
  
  }

supply_effect <- rep(0,n)

for( i in 1:nrow(initial_vaults) ){ 
  supply_effect[i] <- vault_check(initial_vaults[i, ])
}

initial_vaults$supply_effect <- supply_effect 

message("net frETH available supply:")
sum(supply_effect)
message("Total ETH deposited:")
sum(initial_vaults$deposit)

message("net frETH supply per ETH deposited")
sum(supply_effect)/sum(initial_vaults$deposit)

message("ETH paid as early withdrawal penalties")
sum((initial_vaults$progress != "completer") * 0.005 * initial_vaults$deposit)
