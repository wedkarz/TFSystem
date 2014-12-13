package models

import org.junit.Test
import org.junit.Assert._
import java.sql.Date

class EventManagerTest {

  	val eventOne = Event(Some(1L), new Date(2443243244332L), "Gdańsk")
	val eventTwo = Event(Some(2L), new Date(2132121321231L), "Gdańsk")
	val eventThree = Event(Some(3L), new Date(23123131132123L), "Gdańsk")
	
	val presentationOne = Presentation(Some(1L), Some("bbb"), Some("15-16"),Some("Presenter 1"), Some(1L))
	val presentationTwo = Presentation(Some(2L), Some("ccc"), Some("15-16"),Some("Presenter 1, Presenter 2"), Some(2L))
	val presentationThree = Presentation(Some(3L), Some("ddd"), Some("16-17"),Some("Presenter 1, Presenter 3"), Some(2L))
  
	val inputList: List[(Event, Presentation)] = List(
	    (eventOne, presentationOne), (eventTwo, presentationTwo), (eventTwo, presentationThree),
	    (eventThree, Presentation(None, None, None, None))
	    )
	
	val expectedList: List[EventWithPresentations] = List(
	    EventWithPresentations(eventOne, Some(List(presentationOne))),
	    EventWithPresentations(eventTwo, Some(List(presentationTwo, presentationThree))),
	    EventWithPresentations(eventThree, Some(List()))
	    )
	    
  @Test def mapToEventWithPresenationsListTest = {
    assertEquals(expectedList, EventsManager.mapToEventWithPresenationsList(inputList))
  }
}