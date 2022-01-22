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

            { "cherry-pit.mp3", Properties.Resources.cherry_pit_mp3 },
            { "consolation-sting.mp3", Properties.Resources.consolation_sting_mp3 },
            { "flowstone-flood.mp3", Properties.Resources.flowstone_flood_mp3 },
            { "grumbles.mp3", Properties.Resources.grumbles_mp3 },
            { "lost-in-lessonus.mp3", Properties.Resources.lost_in_lessonus_mp3 },
            { "mystery-sting.mp3", Properties.Resources.mystery_sting_mp3 },
            { "otmt.mp3", Properties.Resources.otmt_mp3 },
            { "sealed-in-ink.mp3", Properties.Resources.sealed_in_ink_mp3 },
            { "shiny-sting.mp3", Properties.Resources.shiny_sting_mp3 },
            { "slab-plus.mp3", Properties.Resources.slab_plus_mp3 },
            { "tunntop.mp3", Properties.Resources.tunntop_mp3 },
            { "unknown-coordinates.mp3", Properties.Resources.unknown_coordinates_mp3 },
            { "youve-strayed.mp3", Properties.Resources.youve_strayed_mp3 },

            { "airWarn.mp3", Properties.Resources.airWarn_mp3 },
            { "championSight.mp3", Properties.Resources.championSight_mp3 },
            { "chip.mp3", Properties.Resources.chip_mp3 },
            { "damageImpact.mp3", Properties.Resources.damageImpact_mp3 },
            { "damageShock.mp3", Properties.Resources.damageShock_mp3 },
            { "damageTaser.mp3", Properties.Resources.damageTaser_mp3 },
            { "dead.mp3", Properties.Resources.dead_mp3 },
            { "digDirt.mp3", Properties.Resources.digDirt_mp3 },
            { "digSand.mp3", Properties.Resources.digSand_mp3 },
            { "explode.mp3", Properties.Resources.explode_mp3 },
            { "growlSight.mp3", Properties.Resources.growlSight_mp3 },
            { "gulp.mp3", Properties.Resources.gulp_mp3 },
            { "heartbeat.mp3", Properties.Resources.heartbeat_mp3 },
            { "hurt.mp3", Properties.Resources.hurt_mp3 },
            { "inkDead.mp3", Properties.Resources.inkDead_mp3 },
            { "inkTeleport.mp3", Properties.Resources.inkTeleport_mp3 },
            { "itemGet.mp3", Properties.Resources.itemGet_mp3 },
            { "itemSelect.mp3", Properties.Resources.itemSelect_mp3 },
            { "money.mp3", Properties.Resources.money_mp3 },
            { "projectile.mp3", Properties.Resources.projectile_mp3 },
            { "rockSmash.mp3", Properties.Resources.rockSmash_mp3 },
            { "smallDead.mp3", Properties.Resources.smallDead_mp3 },
            { "smash.mp3", Properties.Resources.smash_mp3 },
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
