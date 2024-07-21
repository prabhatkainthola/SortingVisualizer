document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array');
    const generateArrayBtn = document.getElementById('generateArray');
    const sortBtn = document.getElementById('sort');
    const algorithmSelect = document.getElementById('algorithm');

    let array = [];
    const arraySize = 50;
    const animationSpeed = 50; // Lower value means faster animations

    function generateArray() {
        array = [];
        for (let i = 0; i < arraySize; i++) {
            array.push(Math.floor(Math.random() * 100) + 1);
        }
        displayArray();
    }

    function displayArray() {
        arrayContainer.innerHTML = '';
        array.forEach((value) => {
            const arrayBar = document.createElement('div');
            arrayBar.classList.add('array-bar');
            arrayBar.style.height = `${value}%`;
            arrayBar.style.width = `${100 / arraySize}%`;
            arrayContainer.appendChild(arrayBar);
        });
    }

    async function bubbleSort() {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    await swap(j, j + 1);
                    displayArray();
                    await sleep(animationSpeed);
                }
            }
        }
    }

    async function selectionSort() {
        for (let i = 0; i < array.length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
            await swap(i, minIndex);
            displayArray();
            await sleep(animationSpeed);
        }
    }

    async function insertionSort() {
        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
                displayArray();
                await sleep(animationSpeed);
            }
            array[j + 1] = key;
            displayArray();
            await sleep(animationSpeed);
        }
    }

    async function mergeSort(start = 0, end = array.length - 1) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }

    async function merge(start, mid, end) {
        const left = array.slice(start, mid + 1);
        const right = array.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k++] = left[i++];
            } else {
                array[k++] = right[j++];
            }
            displayArray();
            await sleep(animationSpeed);
        }
        while (i < left.length) {
            array[k++] = left[i++];
            displayArray();
            await sleep(animationSpeed);
        }
        while (j < right.length) {
            array[k++] = right[j++];
            displayArray();
            await sleep(animationSpeed);
        }
    }

    async function quickSort(start = 0, end = array.length - 1) {
        if (start >= end) return;
        const index = await partition(start, end);
        await Promise.all([
            quickSort(start, index - 1),
            quickSort(index + 1, end)
        ]);
    }

    async function partition(start, end) {
        const pivot = array[end];
        let index = start;
        for (let i = start; i < end; i++) {
            if (array[i] < pivot) {
                await swap(i, index);
                index++;
                displayArray();
                await sleep(animationSpeed);
            }
        }
        await swap(index, end);
        displayArray();
        await sleep(animationSpeed);
        return index;
    }

    async function swap(i, j) {
        [array[i], array[j]] = [array[j], array[i]];
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateArrayBtn.addEventListener('click', generateArray);
    sortBtn.addEventListener('click', async () => {
        document.querySelectorAll('.array-bar').forEach(bar => bar.classList.remove('sorted'));
        const algorithm = algorithmSelect.value;
        switch (algorithm) {
            case 'bubbleSort':
                await bubbleSort();
                break;
            case 'selectionSort':
                await selectionSort();
                break;
            case 'insertionSort':
                await insertionSort();
                break;
            case 'mergeSort':
                await mergeSort();
                break;
            case 'quickSort':
                await quickSort();
                break;
        }
        document.querySelectorAll('.array-bar').forEach(bar => bar.classList.add('sorted'));
    });

    generateArray();
});
