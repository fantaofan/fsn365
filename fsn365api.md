# 页面和API路径的对应关系

## 区块：

- /blocks 页面
  - 功能：展示区块列表
  - 接口： /blocks
- /block/: height
  - 功能：展示区块信息和区块内包含的交易信息
  - 接口：
      - /block/ :height 
      - /block/ :height/txs
## 交易
- /txs 页面：
  - 功能：展示交易信息
  - 接口： /txs
- /tx/: hash
  - 功能：展示交易相关的信息


## 资产：
- /tokens 页面：
  - 功能：展示 fusion 资产列表
  - 接口：/tokens
    - 其中 /tokens?type=1 表示获取 erc20 资产列表
    - /tokens?type=0 表示获取 fusion 上发行的资产列表
- /token/: hash
  - 功能： 展示token 信息
  - 接口：
    - /token/: hash 获取基本信息
    - /token/: hash/txs 获取最新的10k交易记录
    - /token/: hash/holders 获取排至多 1000 个代币持有热信息。

**注意**： erc20 代币和在 fusion 上发行的资产，走相同的接口。后端会进行判断这个 hash 是 fusion上发行的资产或是地址或是erc20代币。

## address 页面：
  - 页面：/address/: hash｜:usan
    - 功能： 获取地址概览信息
    - 接口： 
      - /address/: hash： 获取地址的概览信息（如果是erc20地址，会带有erc20 字段，前端请跳转到 /token/: hash 页面）
      - /address/: hash/assets  
        - 功能：获取地址的资产列表，包含erc20代币
      - /address/: hash/tlassets
        - 功能： 获取资产时间🔒代币信息
      - /address/: hash/txs
        功能： 获取和这个地址相关的交易信息。

## 首页：
  - 最新的交易和区块信息
    - 接口： /network
  - 统计信息：
    - 接口： /stats 这块儿很可能变动很大，请暂时不处理。