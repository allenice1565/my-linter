# my-linter

本工具已经发布到npm网站上了。可以下载使用。

my-linter是为了解决node项目初始化时的需要进行代码格式化工具配置，而各种工具都配置一遍，比较消耗精力，因此需要一款自动化配置的工具，my-linter就是满足我在项目中需要用到的格式化工具进行自动化的配置。

包含了一下格式化工具：

> eslint prettier husky lint-staged commitlint commitizen等

如果想使用`cz`命令进行提交，可以全局安装`commitizen`，输入命令：

```bash
npm install -g commitizen
```

然后提交的时候就可以在终端以命令`cz`进行交互式提交了。

commitizen适配器有很多，但是有一个功能是需要定制的，就是需要增加一个“是否发布？”的提问，如果选择是，则需要在提交信息的末尾拼接上`#release#`后缀，以实现CI/CD自动化部署（只有这个后缀才部署，而不是只要有提交就部署，那样比较浪费资源，尤其是大团队）。
