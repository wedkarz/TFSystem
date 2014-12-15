package models
import org.junit.Test
import org.junit.Assert._
import java.sql.Date
import play.api.libs.json._

class SerializersTest {	
	
	implicit val eventWithPresentationsFormat = Serializers.EventWithPresentationsFormat
	implicit val eventFormat = Serializers.EventFormat
  
	val eventOne = Event(Some(1L), new Date(2443243244332L), "Gdańsk")
	val eventTwo = Event(Some(2L), new Date(2132121321231L), "Gdańsk")
	val eventThree = Event(Some(3L), new Date(23123131132123L), "Gdańsk")
	
	val presentationTwo = Presentation(Some(2L), Some("ccc"), Some("15-16"), Some("Presenter 1, Presenter 2"), Some(2L))
	val presentationThree = Presentation(Some(3L), Some("ddd"), Some("16-17"), Some("Presenter 1, Presenter 3"), Some(2L))
	
	val eventList = List(
	    EventWithPresentations(eventTwo, Some(List(presentationTwo, presentationThree))),
	    EventWithPresentations(eventThree, Some(List()))
	    )
	    
	val eventJson = JsObject(Seq("id" -> JsNumber(1), "date" -> JsNumber(2443243244332L), "place" -> JsString("Gdańsk")))
	
	val eventListJson = JsArray(Seq(
									JsObject(Seq(
												"event" -> JsObject(Seq("id" -> JsNumber(2L), "date" -> JsNumber(2132121321231L), "place" -> JsString("Gdańsk"))),
												"presentations" -> JsArray(
												    Seq(JsObject(Seq("id" -> JsNumber(2L), "name" -> JsString("ccc"), "time" -> JsString("15-16"), "presenters" -> JsString("Presenter 1, Presenter 2"), "eventId" -> JsNumber(2L))),
												        JsObject(Seq("id" -> JsNumber(3L), "name" -> JsString("ddd"), "time" -> JsString("16-17"), "presenters" -> JsString("Presenter 1, Presenter 3"), "eventId" -> JsNumber(2L)))))
											)),
									JsObject(Seq(
												"event" -> JsObject(Seq("id" -> JsNumber(3L), "date" -> JsNumber(23123131132123L), "place" -> JsString("Gdańsk"))),
												"presentations" -> JsArray(
												    Seq()))
											)
	    ))

  	
	
  	@Test def writeEventWithPresentationsTest = {
		assertEquals(eventListJson, Json.toJson(eventList))
	}
	
	@Test def writeEventTest = {
		
		assertEquals(eventJson, Json.toJson(eventOne))
	} 
}