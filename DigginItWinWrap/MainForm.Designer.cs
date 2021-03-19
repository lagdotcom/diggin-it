
namespace DigginItWinWrap
{
  partial class MainForm
  {
    /// <summary>
    /// Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
      if (disposing && (components != null))
      {
        components.Dispose();
      }
      base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    /// Required method for Designer support - do not modify
    /// the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
      System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
      this.Web = new Microsoft.Web.WebView2.WinForms.WebView2();
      ((System.ComponentModel.ISupportInitialize)(this.Web)).BeginInit();
      this.SuspendLayout();
      //
      // Web
      //
      this.Web.CreationProperties = null;
      this.Web.DefaultBackgroundColor = System.Drawing.Color.White;
      this.Web.Dock = System.Windows.Forms.DockStyle.Fill;
      this.Web.Location = new System.Drawing.Point(0, 0);
      this.Web.Name = "Web";
      this.Web.Size = new System.Drawing.Size(800, 450);
      this.Web.TabIndex = 1;
      this.Web.ZoomFactor = 1D;
      this.Web.CoreWebView2InitializationCompleted += new System.EventHandler<Microsoft.Web.WebView2.Core.CoreWebView2InitializationCompletedEventArgs>(this.Web_CoreWebView2InitializationCompleted);
      //
      // MainForm
      //
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(800, 450);
      this.Controls.Add(this.Web);
      this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
      this.Name = "MainForm";
      this.Text = "Diggin\' It";
      ((System.ComponentModel.ISupportInitialize)(this.Web)).EndInit();
      this.ResumeLayout(false);

    }

    #endregion
    private Microsoft.Web.WebView2.WinForms.WebView2 Web;
  }
}
