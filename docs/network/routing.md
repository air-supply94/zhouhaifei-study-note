---
title: routing
order: 5
---

### 原理

- 如果目的地位址属于处理封包之设备目前所在的网路范围之内,那么就直接从 ARP 表格中寻找目的地位址的 IP 所对应的实体位址,如果没有的话就用 ARP 协定来查询
- 如果目的位址在其他网路的话,那么就在 ARP 表格中寻找路由器的实体位址,如果没有则用 ARP 协定来查询

### 路由表

- 静态(Static): 由管理员预先设定或手工修改
- 动态(Dynamic): 路由器之间透过路由协定自动更新

### 协议

常见 RIP

### 命令

- route del -net 203.168.168.0 netmask 255.255.255.0 dev eth1
- route add -net 203.168.168.0 gw 192.168.0.4 netmask 255.255.255.0 dev eth1
- route add -host 192.168.0.25 dev eth0:0
