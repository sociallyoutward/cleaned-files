<?php
    session_start();
    require 'functions.php';  // Include functions
    require 'dbconfig.php';
    require_once('Facebook/FacebookSession.php');
    require_once('Facebook/FacebookRedirectLoginHelper.php');
    require_once('Facebook/FacebookRequest.php');
    require_once('Facebook/FacebookResponse.php');
    require_once('Facebook/FacebookSDKException.php');
    require_once('Facebook/FacebookRequestException.php');
    require_once('Facebook/FacebookAuthorizationException.php');
    require_once('Facebook/GraphObject.php');
    require_once('Facebook/HttpClients/FacebookCurl.php');
    require_once('Facebook/HttpClients/FacebookHttpable.php');
    require_once('Facebook/HttpClients/FacebookCurlHttpClient.php');
    require_once('Facebook/Entities/AccessToken.php');
    require_once('Facebook/GraphUser.php');
    use Facebook\FacebookSession;
    use Facebook\FacebookRedirectLoginHelper;
    use Facebook\FacebookRequest;
    use Facebook\FacebookResponse;
    use Facebook\FacebookSDKException;
    use Facebook\FacebookRequestException;
    use Facebook\FacebookAuthorizationException;
    use Facebook\GraphObject;
    use Facebook\HttpClients\FacebookCurl;
    use Facebook\HttpClients\FacebookHttpable;
    use Facebook\HttpClients\FacebookCurlHttpClient;
    use Facebook\Entities\AccessToken;
    use Facebook\GraphUser;
     
    $app_id = '496761540436805';
    $app_secret = 'f5a4fef7e73a9ffb77f20a2692d50ec3';
     
    FacebookSession::setDefaultApplication($app_id, $app_secret);

    $helper = new FacebookRedirectLoginHelper("http://sociallyoutward.com/setSession.php", $app_id, $app_secret);

    $loginUrl = $helper->getLoginUrl(array('email'));

    //echo $loginUrl;

    header("location:" . $loginUrl);
    
?>