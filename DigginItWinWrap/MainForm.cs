using Microsoft.Web.WebView2.Core;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Windows.Forms;

namespace DigginItWinWrap
{
  public partial class MainForm : Form
  {
    private readonly Dictionary<string, byte[]> data = new Dictionary<string, byte[]>()
        {
            { "index.html", Properties.Resources.index_html },
            { "bundle.min.js", Properties.Resources.bundle_min_js },
            { "favicon.ico", Properties.Resources.favicon_ico },
            { "consolation-sting.mp3", Properties.Resources.consolation_sting_mp3 },
            { "flowstone-flood.mp3", Properties.Resources.flowstone_flood_mp3 },
            { "grumbles.mp3", Properties.Resources.grumbles_mp3 },
            { "lost-in-lessonus.mp3", Properties.Resources.lost_in_lessonus_mp3 },
            { "mystery-sting.mp3", Properties.Resources.mystery_sting_mp3 },
            { "sealed-in-ink.mp3", Properties.Resources.sealed_in_ink_mp3 },
            { "shiny-sting.mp3", Properties.Resources.shiny_sting_mp3 },
        };

    public MainForm()
    {
      InitializeComponent();

      Text = $"Diggin' It v{Properties.Resources.Version}";
      Web.EnsureCoreWebView2Async();
    }

    private void Web_CoreWebView2InitializationCompleted(object sender, CoreWebView2InitializationCompletedEventArgs e)
    {
      if (!e.IsSuccess)
      {
        MessageBox.Show(e.InitializationException.ToString(), "Error");
        return;
      }

      Web.CoreWebView2.AddWebResourceRequestedFilter("http://game/*", CoreWebView2WebResourceContext.All);
      Web.CoreWebView2.WebResourceRequested += CoreWebView2_WebResourceRequested;
      Web.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
      Web.CoreWebView2.Settings.AreDefaultScriptDialogsEnabled = false;
      Web.CoreWebView2.Settings.AreDevToolsEnabled = false;
      Web.CoreWebView2.Settings.AreHostObjectsAllowed = false;
      Web.CoreWebView2.Settings.IsStatusBarEnabled = false;
      Web.CoreWebView2.Navigate("http://game/index.html");
    }

    private void CoreWebView2_WebResourceRequested(object sender, CoreWebView2WebResourceRequestedEventArgs e)
    {
      string path = e.Request.Uri.Substring(12);
      if (!data.ContainsKey(path))
      {
        MessageBox.Show($"Bundle does not contain file: {path}", "Error");
        return;
      }

      var stream = new MemoryStream(data[path]);

      Debug.WriteLine($"Request: {path}");
      e.Response = Web.CoreWebView2.Environment.CreateWebResourceResponse(stream, (int)HttpStatusCode.OK, "OK", null);
    }
  }
}
