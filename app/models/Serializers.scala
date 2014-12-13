package models

import play.api.libs.json._
import play.api.libs.json.util._
import play.api.libs.functional.syntax._
import scala.slick.driver.PostgresDriver.simple._
import java.sql.Date

object Serializers {
	
  implicit val EventFormat: Format[Event] = (
    (__ \ "id").format[Option[Long]] and
    (__ \ "date").format[Date] and
    (__ \ "place").format[String]
  )(Event.apply, unlift(Event.unapply))
  
  implicit val PresentationFormat: Format[Presentation] = (
      (__ \ "id").format[Option[Long]] and
      (__ \ "name").format[Option[String]] and
      (__ \ "time").format[Option[String]] and
      (__ \ "presenters").format[Option[String]] and
      (__ \ "eventId").format[Option[Long]]
	)(Presentation.apply, unlift(Presentation.unapply))
	
  implicit val EventWithPresentationsFormat: Format[EventWithPresentations] = (
      (__ \ "event").format[Event] and
      (__ \ "presentations").format[Option[List[Presentation]]]
      )(EventWithPresentations.apply, unlift(EventWithPresentations.unapply))	 
}