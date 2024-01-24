import{
    bootstrapCameraKit,
    createMediaStreamSource,
    Tranform2D,
} from '@snap/camera-kit'

(async function() {
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzAzNjgwNzE5LCJzdWIiOiJkMTZmMDk0Yy0zZWE3LTQxMzMtODMwMS03MDViNmU5NGNjMmR-U1RBR0lOR34zNDIwZDcxOS0wNDEzLTQzNTQtYjFlYi1lYTA5MjVkYzkxYTYifQ.8LjL3Etv6MJ-daKT_bIQ2zCMdJT1UuI-yM38THKjhrg'})

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['4ec222bd-4fe9-4e2b-a2d0-0e94603b199a'])

    session.applyLens(lenses[0])

    let mediaStream = await navigator.mediaDevices.getUserMedia({video: {
        facingMode: 'environment'
    }});

    const source = createMediaStreamSource(mediaStream, {
        cameraType: 'back'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})();