package controllers

import models._
import play.api._
import play.api.data._
import play.api.data.Forms._
import play.api.mvc._
import play.api.libs.json.Json._
import play.api.libs.json._
import java.sql.Date


object Events extends Controller {
 
  implicit val eventWithPresentationsFormat = Serializers.EventWithPresentationsFormat
  implicit val eventFormat = Serializers.EventFormat
  
  def getAllEvents = Action { 
        
    val eventList = EventsManager.getAllEventsWithPresentations
       
    Ok(Json.toJson(eventList))
  }
  
  def getEvent(id: Long) = Action {
    
	  val event = EventsManager.getEventWithPresentations(id)
	
	  Ok(Json.toJson(event))  
  }
  
  def updateEvent(id: Long) = Action { implicit request =>
    val eventJson = request.body
    val toUpdate = eventJson.asJson.get.as[EventWithPresentations]
    EventsManager.updateEvent(id, toUpdate.event)
    PresentationsManager.updatePresentations(toUpdate.presentations.get, id)
    Ok(Json.toJson("success"))
  }

  def saveEvent = Action { implicit request =>
    val toSave = request.body.asJson.get.as[EventWithPresentations]
    val newEventId = EventsManager.insertEvent(toSave.event)
    PresentationsManager.savePresentations(toSave.presentations.get, newEventId)
    Ok(Json.toJson("success"))
  }
}