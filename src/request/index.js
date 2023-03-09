import axios from 'axios';

const instanceAxions = axios.create ({
    timeout: 5000,
    baseURL: 'https://www.chengzier.cn:8000'
});

// $.get('/api/navigation');

export default instanceAxions;