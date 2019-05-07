# Ethereum Bridge

This local Eth-bridge proof of concept is comprised of 4 docker cointainers.
* `db` database
* `ethereum` geth node with a custom private chain
* `parser` A simple ethereum block listener/tx parser
* `web` a simple API for communicating with ETH chain

## Setting up the environment

Requirement: Docker

First run `docker-compose up db ethereum` to setup the prerequisites. There is no 'wait-for' script implemented for this PoC so this has to be run separately to ensure that requirement services are up and running.

After requirements are running, run `docker-compose up web parser` to start the parser and web API. API is then available on `localhost:3000`

## Example usage

Available endpoints with examples are available here: https://documenter.getpostman.com/view/6393434/S1Lu3ViF

These are defined with correct private-keys and addresses in requests to get you running.


## Private ETH network predefined accounts with balance
```
{
    "address": "0x0A3135Ca5f8aEA70920b0f2aBB03B5541528B5Ee",
    "privateKey": "0x63b5ebd956b17cdeb07ebdc25173e3f018416b10c9fb5d3d3ee568674c049fce"
},
{
    "address": "0x9e0Fa9CB689b165259ec7cfFa0e84f9a9c753e45",
    "privateKey": "0x2b5dc33507494b4526b8ef2c3b00e01828ced9c09cce5e95d02d90ddc45d2a09"
},
{
    "address": "0x3e58CBEd80764B6EFD28517919A8A23d198Ddb9D",
    "privateKey": "0x6eb49ebd61bd4da7220484afb8ee6195191f830350b9d4a66cae1b1e80783250"
}
```
