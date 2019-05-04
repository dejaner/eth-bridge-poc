FROM ethereum/client-go

WORKDIR /usr/src/mychain

COPY genesis.json ./

RUN geth init genesis.json --datadir /usr/src/mychain

EXPOSE 8546
