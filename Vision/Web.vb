Imports System.Runtime.InteropServices
Public Class RAMSimulator
    Private ramArray As Byte()
    Public Sub New(sizeInBytes As Integer)
        ramArray = New Byte(sizeInBytes - 1) {}
    End Sub
    Public Function ReadByte(address As Integer) As Byte
        Return ramArray(address)
    End Function
    Public Sub WriteByte(address As Integer, value As Byte)
        ramArray(address) = value
    End Sub
End Class
Dim request As HttpWebRequest = DirectCast(WebRequest.Create("http://example.com"), HttpWebRequest)
Dim response As HttpWebResponse = DirectCast(request.GetResponse(), HttpWebResponse)
Dim responseStream As Stream = response.GetResponseStream()
Dim reader As New StreamReader(responseStream)
Dim sourceCode As String = reader.ReadToEnd()
reader.Close()
responseStream.Close()
response.Close()
Dim htmlDoc As HtmlDocument = New HtmlDocument()
htmlDoc.LoadHtml(sourceCode)
Dim nodes As HtmlNodeCollection = htmlDoc.DocumentNode.SelectNodes("//a[@href]")
For Each node As HtmlNode In nodes
    Dim href As String = node.Attributes("href").Value
    ' deal href link
Next