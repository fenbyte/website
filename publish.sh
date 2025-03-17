#!/bin/bash
JEKYLL_ENV=production jekyll build
rclone copy _site nekoweb:/
