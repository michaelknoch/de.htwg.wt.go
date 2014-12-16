import play.Project._

name := """hello-play-java"""

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  "org.webjars" %% "webjars-play" % "2.2.2", 
  "com.googlecode.json-simple" % "json-simple" % "1.1.1",
  "org.webjars" % "bootstrap" % "2.3.1")

playJavaSettings
