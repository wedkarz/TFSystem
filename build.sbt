name := """tech-feast-web"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws,
  "org.webjars" % "requirejs" % "2.1.14",
  "org.webjars" % "underscorejs" % "1.6.0",
  "org.webjars" % "jquery" % "2.1.1",
  "org.webjars" % "bootstrap" % "3.2.0" exclude("org.webjars", "jquery"),
  "org.webjars" % "angularjs" % "1.3.0-beta.13" exclude("org.webjars", "jquery"),
  "joda-time" % "joda-time" % "2.3",
  "com.typesafe.slick" %% "slick" % "2.1.0",
  "postgresql" % "postgresql" % "9.1-901-1.jdbc4",
  "org.scalatest" %% "scalatest" % "2.2.0" % "test",
  "com.propensive" %% "rapture-io" % "0.9.0",
  "com.propensive" %% "rapture-json-spray" % "1.0.8",
  "com.typesafe.play" %% "play-slick" % "0.8.1"
)
