package models

import scala.slick.jdbc.JdbcBackend.Database
import play.api.Play.current
import play.api.db._

object DatabaseConfig {

	//val url = Play.current.configuration.getString("db.url").toString + "?" + 
			//Play.current.configuration.getString("db.user").toString + "&"
			//Play.current.configuration.getString("db.password").toString
	//val db = Database.forURL(url, driver = Play.current.configuration.getString("db.driver").toString)
	val db = Database.forDataSource(DB.getDataSource())		
}