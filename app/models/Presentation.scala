package models

import scala.slick.driver.PostgresDriver.simple._
import scala.slick.lifted.{TableQuery, ProvenShape}
import play.api.libs.json._

case class Presentation (id: Option[Long] = None, name: Option[String], time: Option[String], eventId: Option[Long] = None) {
}

class Presentations(tag: Tag) extends Table[Presentation](tag, "PRESENTATIONS") {
  
  def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
  def name = column[String]("NAME")
  def time = column[String]("TIME")
  def eventId = column[Long]("EVENT_ID")
  
  def * = (id.?, name.?, time.?, eventId.?) <> (Presentation.tupled, Presentation.unapply)
  
  def event = foreignKey("EVENT_FK", eventId, EventsManager.events)(_.id)
  
  
}

object PresentationsManager {
  lazy val presentations = TableQuery[Presentations]
}