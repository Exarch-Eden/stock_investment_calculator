# About
This script file takes **three parameters**:
1. number of stocks
2. annual investment balance
3. timestamp of starting day (optional)

It will calculate the daily investment amount needed for each stock to spend up the entire annual investment balance value. If no timestamp for starting day is specified, it will use current day instead.

This is used to calculate the automated recurring investment value.

# Usage
Use `ts-node` NPM package to run the typescript files

```
ts-node calculator.ts
```
