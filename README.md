# JavaScript Engine Benchmark for React Native

## Benchmark Results

[RN 0.62.2, JSC 250230, V8 8.0, Hermes 0.4.1](https://docs.google.com/spreadsheets/d/1XB6fuk-NYZbCDikxQOAJemE-P8cfbsfdXivTeVwcwIk/edit?usp=sharing)

[RN 0.60.3, JSC 245459, V8 7.5.1, Hermes 0.1.0](https://docs.google.com/spreadsheets/d/1uce3WZ9IaAEUu6Owj3eXEuZb25PDi6ZcgUVV2i500S0/edit#gid=1258377944)

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

The series of test cases aim to measure how long JS engine parse and evaluate the scripts.
TTI time is from the `content_appear_view_time - before_start_ReactInstanceManager_time`.
In different test cases, we try to generate different size of JS bundle and compare if size matters.

  - TTI ~3 MiB bundle
  - TTI ~10 MiB bundle
  - TTI ~15 MiB bundle

### APK Size

Simply the comparion of library binary size and final APK size.

## How to Run the Benchmark

Prerequisites:

- macOS 10.14 (Other macOS versions or Linux might be supported, but I don't verify that)
- Python 3
- Node 8+

Simply to run

```sh
python start.py -a
```

## Disclaimer

This project is specific to measure JS engine performance for React Native. It is not designated to do generic JS engine comparison.

For example, on React Native Android, we don't enable all JIT tiers on JavaScriptCore. On V8, I am currently trying to use the JIT-less mode. What I am trying to do is balancing between good enough performance, low memory usage, and small binary size. That is why to disable JIT sometimes.

