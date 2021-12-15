from scripts.helpful_scripts import get_account
import pytest
from web3 import Web3


@pytest.fixture
def amount_sent():
    return Web3.toWei(1, "ether")


@pytest.fixture(scope="session")
def alice(accounts):
    yield accounts[0]


@pytest.fixture(scope="session")
def bob(accounts):
    yield accounts[1]
