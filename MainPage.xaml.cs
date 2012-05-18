using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using System.IO;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using Niths.Util;
using System.Windows.Navigation;



namespace niths_wp7_fadderuke_app
{
    public partial class MainPage : PhoneApplicationPage
    {
        private WebBrowserHelper _browserHelper;


        // Constructor
        public MainPage()
        {
            InitializeComponent();

            new BackButtonHandler(this, PGView);
            _browserHelper = new WebBrowserHelper(PGView.Browser);

            FlurryWP7SDK.Api.StartSession("LUJSPCZ36EJ134EPMCM2");

            PGView.Browser.ScriptNotify += Browser_ScriptNotify;
            PGView.Browser.Navigated += Browser_Navigated;

            EventHandler<NavigationEventArgs> hideSplashScreen = null;
            hideSplashScreen = (s, e) =>
            {
                fadeOut.Begin();
                PGView.Browser.Navigated -= hideSplashScreen;
            };
            PGView.Browser.Navigated += hideSplashScreen;
        }

        private void GapBrowser_Loaded(object sender, RoutedEventArgs e)
        {

        }

	private void fadeOut_Completed(object sender, EventArgs e) {
        //splashImage.Visibility = Visibility.Collapsed;
	}

  private void Browser_Navigated(object sender, NavigationEventArgs e)
  {
      // when we first navigate to a page, we assume that it can be scrolled
      _browserHelper.ScrollDisabled = false;
  }

  private void Browser_ScriptNotify(object sender, NotifyEventArgs e)
  {
      // if a page notifies that it should not be scrollable, disable
      // scrolling.
      if (e.Value == "noScroll")
      {
          _browserHelper.ScrollDisabled = true;
      }
  }

    private void PGView_Loaded(object sender, RoutedEventArgs e)
    {
        splashImage.Visibility = Visibility.Collapsed;
    }
    }
}
