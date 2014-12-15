package models

import scala.slick.jdbc.JdbcBackend.Database
import play.api.Play.current
import play.api.db._

object DatabaseConfig {

	val db = Database.forDataSource(DB.getDataSource())		
}