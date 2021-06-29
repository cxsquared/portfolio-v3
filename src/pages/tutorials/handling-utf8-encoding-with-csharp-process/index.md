---
title: Handling UTF8 Encoding With C#'s Process
date: '2018-06-25'
category: tutorial
tags:
  [
    tutorial,
    csharp,
    c#,
    mysql,
    sql,
    powershell,
    process,
    encoding,
    utf8,
    programming,
  ]
description: A quick tip on how to handle different encodings with C#'s Process class.
toc: true
comments: true
---

Recently at work I ran into a Unicode encoding issue. We using C#'s [Process]
to run `powershell±mysqldump.exe` to create our SQL backups. Recently we discovered that any Unicode stored in our databases was mangled when we dumped the database. And I spent waaaaay too much time trying to figure out why this was happening so here's how I finally figured out how to fix it.

## TLDR

Turns out Window's doesn't like UTF8 by default. C#'s [Process] uses Windows-1252 encoding by default which is basically latin1. To fix this problem you need to set [Process]'s [StandardErrorEncoding] setting. This is as simple as...

```csharp
process.StartInfo.StandardErrorEncoding = Encoding.UTF8
```

Now [Process]'s StdOut should write proper UTF8 not Window's weird latin1.

## The Long Version

I started looking for solutions to my problem were everyone does [StackOverflow](https://stackoverflow.com/). There were plenty of [StackOverflow questions](https://stackoverflow.com/questions/4599510/mysqldump-from-powershell-and-windows-encoding) around this topic and most of them led me to believe `powershell±mysqldump.exe` was to blame for this issue. So I spent hours making sure our databases had the proper character sets and collation. Everything looked good in our database settings. All our tables and databases used UTF8 encoding which should support basic Unicode just fine. So maybe it was how MySql actually handled the writing of the file.

I tried every possible way of writing the SQL file out. This included using `powershell±mysqldump.exe -r "outputFile.sql"` flag and using both Powershell and Command Line styling piping. The piping always mangled the Unicode while using the `powershell±mysqldump.exe -r "outputFile.sql"` actually handle the Unicode properly. But when I used the `powershell±mysqldump.exe -r "outputFile.sql"` option inside of the C#'s [Process] arguments it just pumped out a blank file. It turns out [Process] doesn't like commands writing files it wants you to use it's StdOut. Which is fine but then I ran into the same issue of mangled Unicode as when I used piping.

Then finally I stumbled upon the [StandardErrorEncoding] variable for [Process]. This was my ticket. If finally dawned on me that Window's was outputting the wrong encoding. This is why none of the piping options worked even when using the dump command in Powershell.

So like I said above the fix is really easy. Just set [StandardErrorEncoding] option on your StartInfo properties and StdOut should start handling Unicode correctly.

```csharp
process.StartInfo.StandardErrorEncoding = Encoding.UTF8
```

Thanks for reading. Hopefully this saves someone else the pain I went through trying to figure out the problem. If you have a question or comment feel free to leave one below.

[process]: https://msdn.microsoft.com/en-us/library/system.diagnostics.process(v=vs.110).aspx
[standarderrorencoding]: https://msdn.microsoft.com/en-us/library/system.diagnostics.processstartinfo.standarderrorencoding(v=vs.110).aspx
