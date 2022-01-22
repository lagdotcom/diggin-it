using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;

namespace DigginItWrapper
{
    class Request
    {
        public string verb;
        public string path;
        public string version;
        public readonly Dictionary<string, string> headers;

        Request()
        {
            headers = new Dictionary<string, string>();
        }

        public static Request fromSocket(Socket sock)
        {
            Request req = new Request();
            byte[] buffer = new byte[1024];
            sock.Receive(buffer, buffer.Length, SocketFlags.None);

            string[] lines = Encoding.ASCII.GetString(buffer).Split("\r\n");
            string[] request = lines[0].Split(' ');
            req.verb = request[0];
            req.path = request[1];
            req.version = request[2];

            for (int i = 1; i < lines.Length; i++)
            {
                string line = lines[i];
                int j = line.IndexOf(':');
                if (j < 0) break;
                else
                {
                    string header = line[0..j];
                    string value = line[(j + 1)..];

                    req.headers[header] = value;
                }
            }

            return req;
        }
    }
}
