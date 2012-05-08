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


namespace niths_wp7_fadderuke_app
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }

        private void GapBrowser_Loaded(object sender, RoutedEventArgs e)
        {

        }

	private void fadeOut_Completed(object sender, EventArgs e) {
        //splashImage.Visibility = Visibility.Collapsed;
	}

    private void PGView_Loaded(object sender, RoutedEventArgs e)
    {
        splashImage.Visibility = Visibility.Collapsed;
    }
    }
}
