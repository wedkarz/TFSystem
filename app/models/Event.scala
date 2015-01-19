package models

import org.joda.time.DateTime
import scala.slick.driver.PostgresDriver.simple._
import play.api.libs.json._
import java.sql.Date

case class Event (id: Option[Long] = None, date: Date, place: String)

// this is not being persisted. It's only for json processing purpose.
case class EventWithPresentations(event: Event, presentations: Option[List[Presentation]])

class Events(tag: Tag) extends Table[Event](tag, "EVENTS") {
  
  def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
  def date = column[Date]("DATE")
  def place = column[String]("PLACE")
  
  def * =  (id.?, date, place) <> (Event.tupled, Event.unapply _)  
    
}

object EventsManager {
  
  def events = TableQuery[Events]
  
  def getAllEvents: List[Event] = {
    DatabaseConfig.db.withSession { implicit session => 
      events.list
    }
  }
  
  def getEventWithPresentations(id: Long): EventWithPresentations = {
    DatabaseConfig.db.withSession { implicit session =>
    	val query = events leftJoin PresentationsManager.presentations on (_.id === _.eventId) filter (_._1.id === id)
    	val results = query.list
    	EventWithPresentations(results(0)._1, Some(mapToPresentationList(results)))
    }
  }
  
  def mapToPresentationList(results: List[(Event, Presentation)]): List[Presentation] = {
    results.map(row => row._2).filter(p => p.id != None)
  }
  
  def updateEvent(id: Long, event: Event) = {
    DatabaseConfig.db.withSession{ implicit session =>
      events.filter(_.id === id).update(event)	  
    }
  }
  
  def getAllEventsWithPresentations: List[EventWithPresentations] = {
    DatabaseConfig.db.withSession { implicit session =>
    	
      val query = events leftJoin PresentationsManager.presentations on (_.id === _.eventId)
    	val results: List[(Event, Presentation)] = query.list
    	mapToEventWithPresenationsList(results)
    } 
  }
  
  def mapToEventWithPresenationsList(results: List[(Event, Presentation)]): List[EventWithPresentations] = {
    val distinctEvents: List[Event] = results.unzip._1.distinct
    val presentations: List[Presentation] = results.unzip._2
    distinctEvents.map(event => EventWithPresentations(event, Some(presentations.filter(p => p.eventId == event.id))))
  }
  
  def insertEvent(event: Event) = {
    DatabaseConfig.db.withSession { implicit session =>
      val newId = (events returning events.map(_.id)) += event
      newId
    }
  } 
  
}



