package com.joaopandolfi.cerberus;

import android.app.Activity;
import android.content.Context;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbManager;
import android.os.Bundle;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.hoho.android.usbserial.driver.UsbSerialDriver;
import com.hoho.android.usbserial.driver.UsbSerialPort;
import com.hoho.android.usbserial.driver.UsbSerialProber;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import java.net.URISyntaxException;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private UsbSerialPort port;
    private UsbDeviceConnection connection;
    boolean initialized = false;
    Activity context;

    private Socket mSocket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        context = this;
        try {
            mSocket = IO.socket("https://controrig.com.br:7879");//"http://192.168.0.170:7878");
            mSocket.on("receive", onNewMessage);

            mSocket.connect();

        } catch (URISyntaxException e) {
            Log.v("ERROR",e.toString());
        }

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(!initialized){
                    Init();
                    initialized = true;
                }
                Log.v("DEBUG",String.format("%b",mSocket.connected()) );
                Send("f");
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    String data = (String) args[0];
                    Log.v("RECEIVED",data);
                    if(!initialized){
                        Init();
                        initialized = true;
                    }

                    Send(data);
                    mSocket.emit("responded", data);
                }
            });
        }
    };

    private void Send(String data){
        if(connection == null){
            return;
        }
        try {
            port.write(data.getBytes(), 20);
        }catch (Exception e){
            try {
                port.close();
            }catch (Exception e2){}
            initialized = false;
        }
    }

    private void Init(){
        // Find all available drivers from attached devices.
        UsbManager manager = (UsbManager) getSystemService(Context.USB_SERVICE);
        List<UsbSerialDriver> availableDrivers = UsbSerialProber.getDefaultProber().findAllDrivers(manager);
        if (availableDrivers.isEmpty()) {
            return;
        }

        // Open a connection to the first available driver.
        UsbSerialDriver driver = availableDrivers.get(0);
        connection = manager.openDevice(driver.getDevice());
        if (connection == null) {
            // add UsbManager.requestPermission(driver.getDevice(), ..) handling here
            return;
        }

       port = driver.getPorts().get(0); // Most devices have just one port (port 0)
        try {
            port.open(connection);
            port.setParameters(9600, 8, UsbSerialPort.STOPBITS_1, UsbSerialPort.PARITY_NONE);
        }catch (Exception e){
            //port.close();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
