# JavaScript Engine Benchmark for React Native

## Measure Result

[The result will keep to be updated at Google SpreadSheets](https://docs.google.com/spreadsheets/d/1uce3WZ9IaAEUu6Owj3eXEuZb25PDi6ZcgUVV2i500S0/edit#gid=1258377944)

These benchmarks ran on Samsung Galaxy Note 5

## Benchmarks

### React Rendering
- RenderComponentThroughput
  
  The series of test cases aim to measure how many React component could be rendered within some intervals. 
  
  - RenderComponentThroughput 10s
  - RenderComponentThroughput 60s
  - RenderComponentThroughput 180s
  
  The reason that have different interval is that to assume JIT will start to work after longer repetitive executions.
   
  **Higher result is better**

### TTI (Time-To-Interaction)
TBD

## How to Run the Benchmark

Prerequisites:

- Python 3
- Node 8+

Simply to run

```sh
python start.py
```
## Disclaimer

This project is specific to measure JS engine performance for React Native. It is not designated to do generic JS engine comparison.

For example, on React Native Android, we don't enable all JIT tiers on JavaScriptCore. On V8, I am currently trying to use the JIT-less mode. What I am trying to do is balancing between good enough performance, low memory usage, and small binary size. That is why to disable JIT sometimes.

