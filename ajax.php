<?php
$action = $_REQUEST['action'];

if (!empty($action)) {
    require_once 'includes/Profile.php';
    $obj = new Profile();
}

if ($action == 'adduser' && !empty($_POST)) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $photo = $_FILES['photo'];
    $profileId = (!empty($_POST['userid'])) ? $_POST['userid'] : '';

    // file (photo) upload
    $imagename = '';
    if (!empty($photo['name'])) {
        $imagename = $obj->uploadPhoto($photo);
        $profileData = [
            'fname' => $fname,
            'lname' => $lname,
            'photo' => $imagename,
        ];
    } else {
        $profileData = [
          'fname' => $fname,
          'lname' => $lname
        ];
    }

    if ($profileId) {
        $obj->update($profileData, $profileId);
    } else {
        $profileId = $obj->add($profileData);
    }

    if (!empty($profileId)) {
        $profile = $obj->getRow('id', $profileId);
        echo json_encode($profile);
        exit();
    }
}

if ($action == "getusers") {
    $page = (!empty($_GET['page'])) ? $_GET['page'] : 1;
    $limit = 4;
    $start = ($page - 1) * $limit;

    $profiles = $obj->getRows($start, $limit);
    if (!empty($profiles)) {
        $profileslist = $profiles;
    } else {
        $profileslist = [];
    }
    $total = $obj->getCount();
    $profileArr = ['count' => $total, 'profiles' => $profileslist];
    echo json_encode($profileArr);
    exit();
}

if ($action == "getuser") {
    $profileId = (!empty($_GET['id'])) ? $_GET['id'] : '';
    if (!empty($profileId)) {
        $profile = $obj->getRow('id', $profileId);
        echo json_encode($profile);
        exit();
    }
}

if ($action == "deleteuser") {
    $playerId = (!empty($_GET['id'])) ? $_GET['id'] : '';
    if (!empty($playerId)) {
        $isDeleted = $obj->deleteRow($playerId);
        if ($isDeleted) {
            $message = ['deleted' => 1];
        } else {
            $message = ['deleted' => 0];
        }
        echo json_encode($message);
        exit();
    }
}

if ($action == 'search') {
    $queryString = (!empty($_GET['searchQuery'])) ? trim($_GET['searchQuery']) : '';
    $results = $obj->searchProfile($queryString);
    echo json_encode($results);
    exit();
}
