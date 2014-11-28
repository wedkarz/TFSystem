package models

import org.joda.time.DateTime
import scala.slick.driver.PostgresDriver.simple._
import play.api.libs.json._
import java.sql.Date

case class Event (id: Option[Long] = None, date: Date) {

}

class Events(tag: Tag) extends Table[Event](tag, "EVENTS") {
  
  def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
  def date = column[Date]("DATE")
  
  def * =  (id.?, date) <> (Event.tupled, Event.unapply _)  
    
}

object EventsManager {
  
  def events = TableQuery[Events]
  
  def getAllEvents: List[Event] = {
    DatabaseConfig.db.withSession { implicit session => 
      events.list
    }
  }
  
  def getAllEventsWithPresentations: List[(Event, List[Presentation])] = {
    DatabaseConfig.db.withSession { implicit session =>
    	
      	val query = events leftJoin PresentationsManager.presentations on (_.id === _.eventId)
    	val results = query.list
    	results.map(row => (row._1, mapPresentationToList(row._2)))
    			.map(row => (row._1, results.filter(x => row._1.id == x._2.eventId).unzip._2)).distinct
    } 
  }
  
  def mapPresentationToList(p: Presentation) = p.id match {
    case None => List()
    case _ => List(p)
  }
}
