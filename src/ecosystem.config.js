module.exports = {
    apps: [{
        name: 'app',
        script: './server.js',
        instances : 'max',
        exec_mode: "cluster",
        wait_ready: true,
        listen_timeout: 50000,
        autorestart: true,
        kill_timeout: 5000,
        max_memory_restart: '300M', // 프로세스의 메모리가 300MB에 도달하면 reload 실행
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        error_file: '/var/log/pm2/app-error.log',
        out_file: '/var/log/pm2/app-output.log',
    }]
}

//
// server.keepAliveTimeout = 65000; // Ensure all inactive connections are terminated by the ALB, by setting this a few seconds higher than the ALB idle timeout
// server.headersTimeout = 66000; 