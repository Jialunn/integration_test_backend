# integration test backend

> Integration test platform backend server <br>
> API:           `http://host:port/swagger`

## Intro

- This Platform is made for Integration test of OpenMMLab's algorithm repo

## Design

### Integration Test

1. List all test (repo + version(v1 or v2)) 
2. test history list and it's result(job_id, result, no log)
3. start a test and can stop it
4. daily test schedule(node-scheduler)

#### database(mysql)

| domain | data type | size |
|-|-|-|
| id | VARCHAR | 32 |

### Benchmark Test

1. repo list
2. start and stop test
3. get test status(process)
4. result list, has details
   1. repo, repo version, test version, **all model list**
   2. model test result(success. if fail, why)
   3. test history of one model

#### database(mysql)

#### database(mongodb)

### Compatible Test

1. test list
2. maintain the tree of dependency

> TODO: parameters of test

#### database(mysql)

## Method

### Integration Test

### Benchmark Test

### Compatible Test
