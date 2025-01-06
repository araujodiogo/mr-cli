import simpleGit from 'simple-git';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { execa } from 'execa';

const GITHUB_REPO_URL = 'https://github.com/araujodiogo/monorepo-template.git';

export async function setupProject(directory) {
  try {
    const targetPath = path.resolve(process.cwd(), directory);

    if (fs.existsSync(targetPath)) {
      console.error(chalk.red(`Error: Directory ${directory} already exists.`));
      process.exit(1);
    }

    console.log(chalk.green('Cloning repository...'));

    const git = simpleGit();
    await git.clone(GITHUB_REPO_URL, targetPath);

    console.log(chalk.green(`Repository cloned successfully into ${targetPath}.`));
    console.log(chalk.blue('Installing dependencies...'));

    process.chdir(targetPath);
    await execa('yarn', ['install'], { stdio: 'inherit' });

    console.log(chalk.green('Dependencies installed successfully.'));
    console.log(chalk.yellow('Your project is ready! Happy coding 🎉'));
  } catch (error) {
    console.error(chalk.red('Failed to set up project:'), error.message);
    process.exit(1);
  }
}
