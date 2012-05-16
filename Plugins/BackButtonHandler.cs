using WP7CordovaClassLib.Cordova;
using Microsoft.Phone.Controls;
using System.ComponentModel;

public class BackButtonHandler
{
    private int _browserHistoryLength = 0;
    //private PGView _phoneGapView;

    private WP7CordovaClassLib.CordovaView _phoneGapView;

    public BackButtonHandler(PhoneApplicationPage page, WP7CordovaClassLib.CordovaView phoneGapView)
    {
        // subscribe to the hardware back-button
        page.BackKeyPress += Page_BackKeyPress;

        // handle navigation events
        phoneGapView.Browser.Navigated += Browser_Navigated;

        _phoneGapView = phoneGapView;
    }

    private void Browser_Navigated(object sender, System.Windows.Navigation.NavigationEventArgs e)
    {
        if (e.NavigationMode == System.Windows.Navigation.NavigationMode.New)
        {
            _browserHistoryLength++;
        }
    }

    private void Page_BackKeyPress(object sender, CancelEventArgs e)
    {
        if (_browserHistoryLength > 1)
        {
            _phoneGapView.Browser.InvokeScript("eval", "history.go(-1)");
            // 2 was changed to 1
            _browserHistoryLength -= 1;
            e.Cancel = true;
        }
    }
}