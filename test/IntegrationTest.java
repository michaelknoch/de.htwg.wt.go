import org.junit.Test;
import play.libs.F.*;
import play.test.*;

import static org.fest.assertions.Assertions.*;
import static play.test.Helpers.*;


public class IntegrationTest {

    /**
     * This integration test uses Solenium to test the app with a browser
     */   
    @Test
    public void test() {
        running(testServer(3333, fakeApplication(inMemoryDatabase())), HTMLUNIT, new Callback<TestBrowser>() {
            public void invoke(TestBrowser browser) {
                browser.goTo("http://localhost:3333");
                assertThat(browser.pageSource()).contains("Hello Play Framework");
            }
        });
    }
  
}
