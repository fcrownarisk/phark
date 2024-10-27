' Define a class to represent Minkowski Spacetime Coordinates
Public Class MinkowskiSpacetime
    Public t As Double ' Time Coordinate
    Public x As Double ' Spatial Coordinate X
    Public y As Double ' Spatial Coordinate Y
    Public z As Double ' Spatial Coordinate Z

    ' Constructor for easy creation of instances
    Public Sub New(ByVal time As Double, ByVal posX As Double, ByVal posY As Double, ByVal posZ As Double)
        t = time
        x = posX
        y = posY
        z = posZ
    End Sub

    ' Method to display the coordinates
    Public Overrides Function ToString() As String
        Return String.Format("({0}, {1}, {2}, {3})", t, x, y, z)
    End Function
End Class