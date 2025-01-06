#!/usr/bin/env node

import { program } from 'commander';
import { setupProject } from '../src/index.js';
import chalk from 'chalk';

program
  .name('my-cli-tool')
  .description('A CLI tool for setting up a project from a GitHub repository.')
  .version('1.0.0');

program
  .command('setup')
  .description('Set up a new project from the GitHub repository')
  .argument('<project-directory>', 'The directory to create the project in')
  .action((directory) => {
    console.log(chalk.blue(`Starting project setup in ${directory}...`));
    setupProject(directory);
  });

program.parse(process.argv);
