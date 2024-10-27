Imports System.Numerics

Public Class CalabiYauManifold
    Private _dimensions As Integer
    Private _coordinates As List(Of Complex)

    Public Sub New(dimensions As Integer)
        _dimensions = dimensions
        _coordinates = New List(Of Complex)(dimensions)
        For i As Integer = 0 To dimensions - 1
            _coordinates.Add(New Complex(0, 0))
        Next
    End Sub

    Public Property Coordinates(i As Integer) As Complex
        Get
            Return _coordinates(i)
        End Get
        Set(value As Complex)
            _coordinates(i) = value
        End Set
    End Property

    Public Overloads Function Equals(obj As Object) As Boolean
        If Not TypeOf obj Is CalabiYauManifold Then Return False
        Dim other = CType(obj, CalabiYauManifold)
        If Me._dimensions <> other._dimensions Then Return False
        For i As Integer = 0 To _dimensions - 1
            If Not Me._coordinates(i).Equals(other._coordinates(i)) Then Return False
        Next
        Return True
    End Function

    Public Overrides Function ToString() As String
        Dim result As New StringBuilder
        result.Append("{")
        For i As Integer = 0 To _dimensions - 1
            result.Append(_coordinates(i).ToString())
            If i < _dimensions - 1 Then
                result.Append(", ")
            End If
        Next
        result.Append("}")
        Return result.ToString()
    End Function

End Class