using System.Collections.Generic;
using System.IO;
using System.Net.Sockets;
using System.Text;

namespace DigginItWrapper
{
    class Response
    {
        public string version;
        public string code;
        public string reason;
        public string source;
        public readonly Dictionary<string, string> headers;
        private byte[] body;

        public Response(string code = "200", string reason = "OK", string version = "HTTP/1.1")
        {
            this.code = code;
            this.reason = reason;
            this.version = version;
            headers = new Dictionary<string, string>
            {
                { "Connection", "Close" }
            };
        }

        public void Source(string filename)
        {
            source = filename;

            string ext = Path.GetExtension(source);
            headers["Content-Type"] = ext switch
            {
                ".html" => "text/html",
                ".ico" => "image/vnd.microsoft.icon",
                ".mp3" => "audio/mpeg",
                ".js" => "application/javascript",
                _ => "application/octet-stream",
            };
        }

        public void Stream(Stream src, long length)
        {
            headers["Content-Length"] = length.ToString();

            body = new byte[length];
            src.Read(body);
        }

        byte[] b(string s)
        {
            return Encoding.ASCII.GetBytes(s);
        }

        public void Send(Socket conn)
        {
            conn.Send(b($"{version} {code} {reason}\r\n"));

            foreach (var pair in headers)
                conn.Send(b($"{pair.Key}: {pair.Value}\r\n"));
            conn.Send(b("\r\n"));

            if (body != null) conn.Send(body);
        }
    }
}
