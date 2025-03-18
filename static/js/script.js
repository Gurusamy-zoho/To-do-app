

// document.getElementById("add-btn").addEventListener('click', function() {
//     let input = document.getElementById("input-box").value.trim(); 

//     if (input === "") {
//         Swal.fire({
//             title: 'Error',
//             text: 'Input cannot be empty!',
//             icon: 'error',
//             confirmButtonText: 'OK',
//             timer: 3000,
//             showClass: {
//                 popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//                 popup: 'animate__animated animate__fadeOutUp'
//             }
//         });
//     }

//     let li = document.createElement('li');
//     li.textContent = input;

//     let span = document.createElement('span');
//     span.innerHTML="\u00d7"
//     document.querySelector('ul').appendChild(li);
//     document.querySelector('li').appendChild(span);


//     li.addEventListener('click', () => {
//         li.classList.toggle('checked');
//     });

//     document.getElementById("input-box").value = "";
// });

document.getElementById("add-btn").addEventListener('click', function() {
    let input = document.getElementById("input-box").value.trim(); 

    if (input === "") {
        Swal.fire({
            title: 'Error',
            text: 'Input cannot be empty!',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return;
    }

    let li = document.createElement('li');
    li.textContent = input;

    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    span.addEventListener('click', (e) => {
        e.stopPropagation(); 
        li.remove();
    });

    li.appendChild(span);

    document.querySelector('ul').appendChild(li);

    li.addEventListener('click', () => {
        li.classList.toggle('checked');
    });

    document.getElementById("input-box").value = "";
});
