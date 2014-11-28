package models
import org.junit.Test
import org.junit.Assert._
import java.sql.Date
import play.api.libs.json._

class SerializersTest {	
	
	implicit val eventWithPresentationsFormat = Serializers.EventWithPresentationsFormat
	implicit val eventFormat = Serializers.EventFormat
  
	val eventList = List(
				(Event(Some(2L), new Date(2132121321231L)), 
				 List(
					Presentation(Some(2L), Some("ccc"), Some("15-16"), Some(2L)), 
					Presentation(Some(3L), Some("ddd"), Some("16-17"), Some(2L))
					)
				),
				(Event(Some(3L), new Date(23123131132123L)), List())
    		)
  
    val event = Event(Some(1L), new Date(2443243244332L))
    
	val eventJson = JsObject(Seq("id" -> JsString("1"), "date" -> JsString("2047-06-04")))
	
	val eventListJson = JsArray(Seq(
									JsObject(Seq(
												"event" -> JsObject(Seq("id" -> JsString("2"), "date" -> JsString("2037-07-25"))),
												"presentations" -> JsArray(
												    Seq(JsObject(Seq("id" -> JsString("2"), "name" -> JsString("ccc"), "time" -> JsString("15-16"), "eventId" -> JsString("2"))),
												        JsObject(Seq("id" -> JsString("3"), "name" -> JsString("ddd"), "time" -> JsString("16-17"), "eventId" -> JsString("2")))))
											)),
									JsObject(Seq(
												"event" -> JsObject(Seq("id" -> JsString("3"), "date" -> JsString("2702-09-29"))),
												"presentations" -> JsArray(
												    Seq()))
											)
	    ))

  	
	
  	@Test def writeEventWithPresentationsTest = {
		assertEquals(eventListJson, Json.toJson(eventList))
	}
	
	@Test def writeEventTest = {
		
		assertEquals(eventJson, Json.toJson(event))
	} 
}