import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class DetailedJavaFXGUI extends Application {

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Detailed JavaFX GUI");

        // Create a menu bar
        MenuBar menuBar = new MenuBar();
        Menu fileMenu = new Menu("File");
        MenuItem openItem = new MenuItem("Open");
        MenuItem saveItem = new MenuItem("Save");
        MenuItem exitItem = new MenuItem("Exit");
        fileMenu.getItems().addAll(openItem, saveItem, new SeparatorMenuItem(), exitItem);
        menuBar.getMenus().add(fileMenu);

        // Create a toolbar
        ToolBar toolBar = new ToolBar();
        Button newBtn = new Button("New");
        Button saveBtn = new Button("Save");
        Button undoBtn = new Button("Undo", new ImageView("/images/undo.png"));
        toolBar.getItems().addAll(newBtn, saveBtn, undoBtn);

        // Create a tab pane
        TabPane tabPane = new TabPane();
        Tab tab1 = new Tab("Tab 1");
        Tab tab2 = new Tab("Tab 2");
        tabPane.getTabs().addAll(tab1, tab2);

        // Create a status bar
        Label statusLabel = new Label("Ready");
        statusLabel.setFont(new Font("Arial", 14));
        statusLabel.setTextFill(Color.DARKGREEN);
        HBox statusBar = new HBox(10, statusLabel);
        statusBar.setPadding(new Insets(5, 5, 5, 5));
        statusBar.setStyle("-fx-background-color: #e6e6e6;");

        // Create a main layout
        BorderPane mainLayout = new BorderPane();
        mainLayout.setTop(menuBar);
        mainLayout.setBottom(statusBar);
        mainLayout.setLeft(toolBar);
        mainLayout.setCenter(tabPane);
        mainLayout.setPadding(new Insets(10));

        // Create a scene
        Scene scene = new Scene(mainLayout, 800, 600);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}