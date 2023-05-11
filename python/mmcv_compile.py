#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@Author  :   Lijialun

@License :   (C) Copyright 2022-2023, PJLAB

@Contact :   lijialun@pjlab.org.cn

@Software:   PyCharm

@File    :   mmcv_compile_task.py

@Time    :   2022/11/22 下午5:02

@Desc    :
"""

import os
import sys
from time import sleep
import yaml
import platform
import argparse
from api4jenkins import Jenkins

from utils.log import logger


build_list = [
    # 'nocuda_py36_torch1.5.0',
    # 'nocuda_py37_torch1.5.0',
    # 'nocuda_py38_torch1.5.0',
    # 'nocuda_py36_torch1.6.0',
    # 'nocuda_py37_torch1.6.0',
    # 'nocuda_py38_torch1.6.0',
    # 'nocuda_py36_torch1.7.0',
    # 'nocuda_py37_torch1.7.0',
    # 'nocuda_py38_torch1.7.0',
    # 'nocuda_py36_torch1.8.0',
    'nocuda_py37_torch1.8.0',
    'nocuda_py38_torch1.8.0',
    'nocuda_py39_torch1.8.0',
    # 'nocuda_py36_torch1.9.0',
    'nocuda_py37_torch1.9.0',
    'nocuda_py38_torch1.9.0',
    'nocuda_py39_torch1.9.0',
    # 'nocuda_py36_torch1.10.0',
    'nocuda_py37_torch1.10.0',
    'nocuda_py38_torch1.10.0',
    'nocuda_py39_torch1.10.0',
    'nocuda_py37_torch1.11.0',
    'nocuda_py38_torch1.11.0',
    'nocuda_py39_torch1.11.0',
    'nocuda_py310_torch1.11.0',
    'nocuda_py37_torch1.12.0',
    'nocuda_py38_torch1.12.0',
    'nocuda_py39_torch1.12.0',
    'nocuda_py310_torch1.12.0',
    'nocuda_py37_torch1.13.0',
    'nocuda_py38_torch1.13.0',
    'nocuda_py39_torch1.13.0',
    'nocuda_py310_torch1.13.0',
    'nocuda_py38_torch2.0.0',
    'nocuda_py39_torch2.0.0',
    'nocuda_py310_torch2.0.0',
    'nocuda_py311_torch2.0.0',
    # 'cuda101_py36_torch1.5.0',
    # 'cuda101_py37_torch1.5.0',
    # 'cuda101_py38_torch1.5.0',
    # 'cuda102_py36_torch1.5.0',
    # 'cuda102_py37_torch1.5.0',
    # 'cuda102_py38_torch1.5.0',
    # 'cuda101_py36_torch1.6.0',
    # 'cuda101_py37_torch1.6.0',
    # 'cuda101_py38_torch1.6.0',
    # 'cuda102_py36_torch1.6.0',
    # 'cuda102_py37_torch1.6.0',
    # 'cuda102_py38_torch1.6.0',
    # 'cuda101_py36_torch1.7.0',
    # 'cuda101_py37_torch1.7.0',
    # 'cuda101_py38_torch1.7.0',
    # 'cuda102_py36_torch1.7.0',
    # 'cuda102_py37_torch1.7.0',
    # 'cuda102_py38_torch1.7.0',
    # 'cuda101_py36_torch1.8.0',
    'cuda101_py37_torch1.8.0',
    'cuda101_py38_torch1.8.0',
    'cuda101_py39_torch1.8.0',
    # 'cuda102_py36_torch1.8.0',
    'cuda102_py37_torch1.8.0',
    'cuda102_py38_torch1.8.0',
    'cuda102_py39_torch1.8.0',
    # 'cuda111_py36_torch1.8.0',
    'cuda111_py37_torch1.8.0',
    'cuda111_py38_torch1.8.0',
    'cuda111_py39_torch1.8.0',
    # 'cuda102_py36_torch1.9.0',
    'cuda102_py37_torch1.9.0',
    'cuda102_py38_torch1.9.0',
    'cuda102_py39_torch1.9.0',
    # 'cuda111_py36_torch1.9.0',
    'cuda111_py37_torch1.9.0',
    'cuda111_py38_torch1.9.0',
    'cuda111_py39_torch1.9.0',
    # 'cuda102_py36_torch1.10.0',
    'cuda102_py37_torch1.10.0',
    'cuda102_py38_torch1.10.0',
    'cuda102_py39_torch1.10.0',
    # 'cuda111_py36_torch1.10.0',
    'cuda111_py37_torch1.10.0',
    'cuda111_py38_torch1.10.0',
    'cuda111_py39_torch1.10.0',
    # 'cuda113_py36_torch1.10.0',
    'cuda113_py37_torch1.10.0',
    'cuda113_py38_torch1.10.0',
    'cuda113_py39_torch1.10.0',
    'cuda113_py37_torch1.11.0',
    'cuda113_py38_torch1.11.0',
    'cuda113_py39_torch1.11.0',
    'cuda113_py310_torch1.11.0',
    'cuda115_py37_torch1.11.0',
    'cuda115_py38_torch1.11.0',
    'cuda115_py39_torch1.11.0',
    'cuda115_py310_torch1.11.0',
    'cuda113_py37_torch1.12.0',
    'cuda113_py38_torch1.12.0',
    'cuda113_py39_torch1.12.0',
    'cuda113_py310_torch1.12.0',
    'cuda116_py37_torch1.12.0',
    'cuda116_py38_torch1.12.0',
    'cuda116_py39_torch1.12.0',
    'cuda116_py310_torch1.12.0',
    'cuda116_py37_torch1.13.0',
    'cuda116_py38_torch1.13.0',
    'cuda116_py39_torch1.13.0',
    'cuda116_py310_torch1.13.0',
    'cuda117_py37_torch1.13.0',
    'cuda117_py38_torch1.13.0',
    'cuda117_py39_torch1.13.0',
    'cuda117_py310_torch1.13.0',
    'cuda117_py38_torch2.0.0',
    'cuda117_py39_torch2.0.0',
    'cuda117_py310_torch2.0.0',
    'cuda117_py311_torch2.0.0',
    'cuda118_py38_torch2.0.0',
    'cuda118_py39_torch2.0.0',
    'cuda118_py310_torch2.0.0',
    'cuda118_py311_torch2.0.0'
]


def get_args():
    parser = argparse.ArgumentParser(
        description="Jenkins platform scheduler, made by Jaylin with ❤.\n")
    parser.add_argument("--config_path",
                        type=str,
                        default='./config/jenkins_global.yml',
                        help="jenkins config path, default is \"./config/jenkins_global.yml\".")
    parser.add_argument("--download_path",
                        type=str,
                        default='/home/PJLAB/lijialun/Downloads/pytorch/artifacts',
                        help="artifacts path.")
    parser.add_argument("--mmcv_tag",
                        type=str,
                        default='v2.0.0',
                        help="mmcv path,")
    return parser.parse_args()


args = get_args()
tag = args.mmcv_tag
logger.log.info('tag            is: ' + tag)
version = tag.split('.')[0][1]
logger.log.info('version        is: ' + version)

OS_NAME = platform.system()

with open(args.config_path, "r") as f:
    config = yaml.load(f.read(), yaml.FullLoader)

server = Jenkins(config['jenkins_url'], auth=(
    config['jenkins_username'], config['jenkins_password']), max_retries=3)


def build_job_api(jenkins_server, build_base_env, mmcv_version):
    logger.log.info('jenkins_server is: ' + str(jenkins_server))
    logger.log.info('build_base_env is: ' + build_base_env)
    logger.log.info('mmcv_version   is: ' + mmcv_version)
    if mmcv_version == '1':
        item = jenkins_server.build_job('mmcv/mmcv_windows_build',
                                        TEST_GIT_BRANCH='main',
                                        REPO_TAG=tag,
                                        GIT_BRANCH='master',
                                        BASE_ENV=build_base_env)
    elif mmcv_version == '2':
        item = jenkins_server.build_job('mmcv/mmcv_2_windows_build',
                                        TEST_GIT_BRANCH='2.x',
                                        REPO_TAG=tag,
                                        GIT_BRANCH='2.x',
                                        BASE_ENV=build_base_env)
    else:
        raise Exception('lese')
    jenkins_build = None
    try:
        while jenkins_build is None:
            jenkins_build = item.get_build()
            sleep(1)
            print('还没拿到build,', jenkins_build)
        description = "%s%s_%s" % (
            'mmcv', tag, build_base_env)
        jenkins_build.set_description(description)
        building_list.append(jenkins_build)
        print(build_base_env, jenkins_build.id)
    except Exception as e:
        print(str(e))
        sys.exit(-3)


def parse_base_env(build_base_env):
    tmp = build_base_env.split("_")
    cuda = tmp[0]
    py = tmp[1]
    torch = tmp[2]
    return (cuda, py, torch)


def parameters_to_dict(parameters):
    d = {}
    for item in parameters:
        d[item.name] = item.value
    return d


def get_storage_dir(build_base_env, repo_name, repo_version):
    cuda, py, torch = parse_base_env(build_base_env)
    root_dir = args.download_path
    if not os.path.exists(root_dir):
        os.makedirs(root_dir)
    if OS_NAME == "Windows":
        path_of_file = os.path.join(root_dir, "%s//%s//%s//%s" %
                                    (repo_name, repo_version, cuda, torch))
    elif OS_NAME == "Linux":
        path_of_file = os.path.join(root_dir, "%s/%s/%s/%s" %
                                    (repo_name, repo_version, cuda, torch))
    else:
        path_of_file = ''
    if not os.path.exists(path_of_file):
        os.makedirs(path_of_file)
    return path_of_file


building_list = []
for i in build_list:
    build_job_api(server, i, version)


retry = {}
failed = []
time_start = time.asctime(time.localtime(time.time()))
while building_list:
    for build in building_list:
        if not build.building:
            # Remove from `build_list`
            building_list.remove(build)
            print(build.id, build.result)
            # Get artifacts
            if build.result == "SUCCESS":
                for artifacts in build.get_artifacts():
                    param = parameters_to_dict(build.get_parameters())
                    base_env = param['BASE_ENV']
                    file_path = get_storage_dir(
                        base_env, 'mmcv', tag)
                    file_name = os.path.join(file_path, artifacts.name)
                    print(build.id, file_name)
                    if os.path.exists(file_name):
                        os.remove(file_name)
                    artifacts.save(file_name)
            # retry for 3 times
            if build.result == "FAILURE":
                p = parameters_to_dict(build.get_parameters())["BASE_ENV"]
                if p not in retry.keys():
                    retry[p] = 0
                retry[p] += 1
                print(p, 'retry: ', retry[p])
                if retry[p] > 10:
                    failed.append(p)
                    continue
                build_job_api(server, p, version)
    sleep(1)

print(failed)
time_end = time.asctime(time.localtime(time.time()))

print("time_start: ", time_start)
print("time_end  : ", time_end)
