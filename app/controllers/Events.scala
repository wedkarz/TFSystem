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
  
  def getAllEvents = Action { 
        
    val eventList = DatabaseConfig.db.withSession { implicit session =>
    	EventsManager.getAllEventsWithPresentations
    }
    
    Ok(Json.toJson(eventList))
  }

}