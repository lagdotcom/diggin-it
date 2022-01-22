using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.IO.Compression;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace DigginItWrapper
{
    class Program
    {
        static TcpListener server;
        static Thread th;
        static ZipArchive zip;

        static void Main(string[] args)
        {
            try
            {
                zip = ZipFile.OpenRead("resources.zip");
            }
            catch
            {
                Console.WriteLine("Could not load resources.zip");
                return;
            }

            server = new TcpListener(IPAddress.Loopback, 33333);
            server.Start();

            string addr = $"http://{server.LocalEndpoint}/";
            Console.WriteLine($"Listening on {addr}");
            OpenBrowser(addr);

            th = new Thread(new ThreadStart(Listen));
            th.Start();

            Console.WriteLine("Hit enter to end.");
            Console.ReadLine();

            server.Stop();
            th.Join();
            Console.WriteLine("Done.");
        }

        static void OpenBrowser(string url)
        {
            try
            {
                Process.Start(url);
            }
            catch
            {
                // hack because of this: https://github.com/dotnet/corefx/issues/10361
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    url = url.Replace("&", "^&");
                    Process.Start(new ProcessStartInfo("cmd", $"/c start {url}") { CreateNoWindow = true });
                }
                else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    Process.Start("xdg-open", url);
                }
                else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
                {
                    Process.Start("open", url);
                }
                else
                {
                    throw;
                }
            }
        }

        static void Listen()
        {
            Socket conn;

            while (true)
            {
                try
                {
                    conn = server.AcceptSocket();
                }
                catch
                {
                    Console.WriteLine("*** Server shutting down...");
                    return;
                }

                // Console.WriteLine($"Connection from {conn.RemoteEndPoint}");

                Request req;
                try
                {
                    req = Request.fromSocket(conn);
                }
                catch (Exception e)
                {
                    Console.WriteLine($"*** ReadRequest: {e}");
                    continue;
                }

                string filename = req.path[1..];
                if (filename.Length == 0) filename = "index.html";

                // Console.WriteLine($"Requested: {filename}");
                ZipArchiveEntry entry = zip.GetEntry(filename);
                Response res = new Response();

                if (entry == null)
                {
                    res.code = "404";
                    res.reason = "File Not Found";
                }
                else
                {
                    Stream data = entry.Open();
                    res.Source(filename);
                    res.Stream(data, entry.Length);
                    data.Close();
                }

                try
                {
                    res.Send(conn);
                    // Console.WriteLine($"Sent: {filename}");
                }
                catch (Exception e)
                {
                    Console.WriteLine($"*** SendResponse: {e}");
                }

                try
                { 
                    conn.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine($"*** CloseConnection: {e}");
                }
            }
        }
    }
}
