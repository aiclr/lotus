<div style="text-align: center;font-size: 40px;">maven</div>

## maven 知识点

> Java不仅是一门编程语言，还是一个平台通过JRuby和Jython我们可以在Java平台上编写和运行Ruby和Python程序。 
> 
> Maven不仅是构建工具，还是一个依赖管理工具和项目信息管理工具。提供了中央仓库，能帮助自动下载构件。
> 
> Java应用都会借用一些第三方的开源类库，这些类库都可以通过依赖的方式引入到项目中来。 \
> 随着依赖的增多，版本不一致，版本冲突，依赖臃肿等问题。
> maven提供了一个优秀的解决方案，它通过一个坐标系统准确地定位每一个构件（artifact），也就通过一组坐标maven能够找到任何一个java类库。
> Maven给这个类库世界引入了经纬，让他们变得有秩序，于是我们可以借助它来有序地管理依赖，轻松地解决那些繁杂的依赖问题
> 
> Maven还能帮助我们管理原本分散在项目中各个角落的项目信息，包括项目描述，开发者列表，版本控制系统地址，许可证缺陷管理系统地址等，能帮助我们节省大量寻找这些信息的时间。 \
> 通过Maven自动生成的站点，以及一些已有的插件，我们还能够轻松获得项目文档，测试报告，静态分析报告，源码版本日志报告等非常有价值的项目信息。
> 
> Maven提供了免费的中央仓库，通过Maven的衍生工具（Nexus）我们还能进行快速地搜索，只要定位了坐标，Maven就能够帮我们自动下载，省去了手工劳动。
> 
> Maven对于项目目录结构，测试用例命令方式等内容都有既定的规则，遵循这些规则，节约学习成本，约定优于配置（Convention Over Configuration）

## 基础

### 安装目录



### 生命周期



### 命令行与生命周期

> 命令行执行maven任务的最主要方式就是调用maven的生命周期阶段， \
> 需要注意的是，各个生命周期是相互独立的，而一个生命周期的阶段有前后依赖关系 \
> maven中主要的生命周期阶段并不多，而常用的maven命令实际都是基于这些阶段简单组合而成的
> - `mvn clean` 该命令调用clean生命周期的clean阶段，实际执行的阶段为clean生命周期的pre-claen和clean阶段。
> - `mvn test default` 生命周期的test阶段，执行阶段为defaul生命周期的validate，initialize。。。直到test的所有阶段，所以执行测试的时候，项目的代码能够自动得以编译。
> - `mvn clean install` 调用clean的clean阶段，和default的install阶段，在执行真正的项目构建之前清理项目是一个很好的实践。
> - `mvn clean deploy site-deploy` 该命令调用clean生命周期的clean阶段，default生命周期的deploy阶段以及site生命周期的site-deploy阶段

### 20171017命令行 mvn clean compile报错

> 错误描述 `No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?`
> > 使用JDK1.8安装后，会在Win10 系统path中新增 C:\ProgramData\Oracle\Java\javapath \
> > 这样命令行mvn clean compile出现“No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?”
>
> 解决方法
> > 把“C:\ProgramData\Oracle\Java\javapath”从（系统）path中删除
>
> 命令解析
> > Clean 告诉maven清理输出目录target/ ,compile 告诉maven编译项目主代码 \
> > 从输出中看到maven首先执行了clean:clean任务，删除target/目录默认情况下maven构建的所有输出都在target/目录中；
> > 接着执行resources:resources任务（未定义项目资源，暂且略过）；
> > 最后执行compile:compile任务，将项目主代码编译至target/classes



### 总结
    
- `mvn clean compile` 编译
- `mvn clean test` 执行test之前会先执行compile
- `mvn clean package` 打包 执行package之前会先执行test
- `mvn clean install` 安装 执行install之前会执行package
- 任何maven项目中都可以执行这些命令

##插件

> 插件目标
> > Maven的核心仅仅定义了抽象的生命周期，具体的任务是交由插件完成的，插件以独立的构件形式存在，因此，Maven核心的分发包只有不到3MB的大小，Maven会在需要的时候下载并使用插件。
> > 对于插件本身，为了能够复用代码，它往往能够完成多个任务。 \
> > 例如maven-dependency-plugin：
> > > 能够基于项目的依赖分析项目依赖，帮助找出潜在的无用依赖； \
> > > 它能够列出项目的依赖树，帮助分析来源，列出项目所有已解析的依赖。 \
> > > 为每个这样的功能编写一个独立的插件显然是不可取的，因为这些任务背后有很多可以复用的代码，因此，这些功能聚集在一个插件里，每个功能就是一个插件目标。 \
> > > Maven-dependency-plugin有十多个目标，每个目标对应一个功能 \
> > > 通用写法，冒号前是插件前缀，冒号后面是插件目标
> > > > - Dependency：analyze分析依赖
> > > > - Dependency：tree列出依赖树
> > > > - Dependency：list列出所有已解析的依赖
>
> 插件绑定 
> > Maven的生命周期与插件相互绑定，用以完成实际的构建任务，具体而言是生命周期的阶段与插件的目标相互绑定，以完成某个具体的构建任务。 \
> > 例如项目编译对应default生命周期的compile阶段，maven-compile-plugin这一插件的compile目标能够完成该任务，因此他们绑定就能实现项目编译的目的
> > 内置绑定
> > > 为了能让用户不用任何配置就能构建maven项目，maven在核心为一些主要的生命周期阶段绑定了很多插件的目标，当用户通过命令行调用生命周期阶段的时候没对应的插件目标就会执行相应的任务
> > 自定义绑定
> > > 用户可以将某个插件目标绑定到生命周期的某个阶段上，这种自定义绑定方式能让Maven项目在构建过程中执行更多更丰富的特色的任务
> > > ```
> > >   <build>
> > >    <plugins>
> > >       <plugin>
> > >           <groupId>org.apache.maven.plugins</groupId>
> > >           <artifactId>maven-source-plugin</artifactId>
> > >           <version>2.1.1</version>
> > >           <executions>
> > >               <execution>
> > >                   <id>attach-sources</id>
> > >                   <phase>verify</phase>
> > >                   <goals>
> > >                       <goal>jar-no-fork</goal>
> > >                   </goals>
> > >               </execution>
> > >           </executions>
> > >       </plugin>
> > >     </plugins>
> > >   </build>
> > > ```
> > > Mvn help：describe-Dplugin org.apache.maven.plugins:maven-source-plugin:2.1.1-Ddetails \
> > > 该命令输出对应插件的详细信息 \
> > > 当插件目标被绑定到不同的生命周期阶段的时候，其执行顺序由生命周期阶段的先后顺序决定，如果多个目标被绑定到同一阶段，他们的执行顺序由插件声明的先后顺序决定 \
> > > 在POM文件的build元素下的plugins子元素中声明插件的使用 \
> > > 该例中用到的是maven-source-plugin，其groupid为org.apache.maven.plugins,是maven官方插件的groupId，紧接着artifactId为maven-source-plugin，version为2.1.1 \
> > > 对于自定义绑定的插件，用户总是应该声明一个非快照版本，这样可以避免由于插件版本变化造成构建不稳定 \
> > > 插件执行配置，executions下每个execution子元素可以用来配置执行一个任务 \
> > > 该例中配置了一个id为attach-sources的任务，通过phrase配置，将其绑定到verify生命周期阶段上，在通过goals配置指定要执行的插件目标 \
> > > 运行mvn verify，maven-source-plugin：jar-no-fork会得以执行，它会创建一个以-sources.jar结尾的源码文件包 \
> > > 有时候即使不通过phase元素配置生命周期阶段，插件目标也能绑定到生命周期中去,如删除phase这一行，再执行mvn verify仍然可以看到maven-source-plugin：jar-no-fork得以执行 \
> > > 这是因为有很多插件的目标在编写时已经定义了默认绑定阶段，可以使用maven-help-plugin查看插件详细信息，了解插件目标的默认绑定阶段 \
> > > > 插件配置
> > > > > 配置插件目标的参数，进一步调整插件目标所执行的任务以满足项目的需求，几乎所有maven插件的目标都有一些可配置的参数，用户可以通过命令行和POM配置等方式来配置这些参数
> > > > > 
> > > > > 命令行插件配置
> > > > > > mvn install –Dmaven.test.skip=true
> > > > > > > Maven-surefire-plugin提供了一个maven.test.skip参数，当其值为true时会跳过执行测试。于是在运行命令的时候加上如下-D参数就能跳过测试 \
> > > > > > > -D是java自带的，其功能是通过命令行设置一个java系统属性，maven简单地重用了该参数，在准备插件的时候检查系统属性，便实现了插件参数的配置 \
> > > > > > > 并不是所有插件参数都适合命令行配置，有些参数的值从项目创建到项目发布都不会改变，或者说很少改变，对于这种情况，在POM文件中一次性配置就显然比重复在命令行输入要方便
> > > > >
> > > > >POM插件全局配置
> > > > > > 配置maven-compiler-plugin告诉它编译JAVA1.5版本的源文件，生成与JVM1.5兼容的字节码文件 \
> > > > > > 这样不管绑定到compile阶段的maven-compiler-plugin：testCompiler任务，就能够使用该配置，基于Java1.5版本进行编译
> > > > > > ```xml
> > > > > > <build>
> > > > > >     <plugins>
> > > > > >         <plugin>
> > > > > >             <groupId>org.apache.maven.plugins</groupId>
> > > > > >             <artifactId>maven-compiler-plugin</artifactId>
> > > > > >             <version>2.1</version>
> > > > > >             <configuration>
> > > > > >                 <source>1.5</source>
> > > > > >                 <target>1.5</target>
> > > > > >             </congiguration>
> > > > > >         </plugin>
> > > > > >     </plugins>
> > > > > > </build>
> > > > > > ```
          


