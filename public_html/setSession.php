<?php
	session_start();
	    // added in v4.0.5
	require_once( 'Facebook/HttpClients/FacebookHttpable.php' );
	require_once( 'Facebook/HttpClients/FacebookCurl.php' );
	require_once( 'Facebook/HttpClients/FacebookCurlHttpClient.php' );

	// added in v4.0.0
	require_once( 'Facebook/FacebookSession.php' );
	require_once( 'Facebook/FacebookRedirectLoginHelper.php' );
	require_once( 'Facebook/FacebookRequest.php' );
	require_once( 'Facebook/FacebookResponse.php' );
	require_once( 'Facebook/FacebookSDKException.php' );
	require_once( 'Facebook/FacebookRequestException.php' );
	require_once( 'Facebook/FacebookOtherException.php' );
	require_once( 'Facebook/FacebookAuthorizationException.php' );
	require_once( 'Facebook/GraphObject.php' );
	require_once( 'Facebook/GraphUser.php' );
	require_once( 'Facebook/GraphSessionInfo.php' );
	require_once( 'Facebook/Entities/AccessToken.php' );

	// added in v4.0.5
	use Facebook\HttpClients\FacebookHttpable;
	use Facebook\HttpClients\FacebookCurl;
	use Facebook\HttpClients\FacebookCurlHttpClient;

	// added in v4.0.0
	use Facebook\FacebookSession;
	use Facebook\FacebookRedirectLoginHelper;
	use Facebook\FacebookRequest;
	use Facebook\FacebookResponse;
	use Facebook\FacebookSDKException;
	use Facebook\FacebookRequestException;
	use Facebook\FacebookOtherException;
	use Facebook\FacebookAuthorizationException;
	use Facebook\GraphObject;
	use Facebook\GraphUser;
	use Facebook\GraphSessionInfo;
	use Facebook\Entities\AccessToken;

	    $app_id = '496761540436805';
    	$app_secret = 'f5a4fef7e73a9ffb77f20a2692d50ec3';
     
    	FacebookSession::setDefaultApplication($app_id, $app_secret);

	    $helper = new FacebookRedirectLoginHelper("http://sociallyoutward.com/setSession.php", $app_id, $app_secret);
	    
	    try {
	    $session = $helper->getSessionFromRedirect();
	    }
	    catch(FacebookRequestException $ex) { }
	    catch(\Exception $ex) { }

	    $_SESSION['fb_token'] = $session->getToken();

	    $user_id = $session->getSessionInfo()->asArray()['user_id'];
	    $_SESSION['fb_id'] = $user_id;

	    try {
			} catch (FacebookRequestException $ex) {
			  // Session not valid, Graph API returned an exception with the reason.
			  echo $ex->getMessage();
			} catch (\Exception $ex) {
			  // Graph API returned info, but it may mismatch the current app or have expired.
			  echo $ex->getMessage();
			}  
		  try {
			    $user_profile = (new FacebookRequest(
			      $session, 'GET', '/me'
			    ))->execute()->getGraphObject(GraphUser::className());

			   $_SESSION['fb_name'] = $user_profile->getName();
			   header("location: setCookie.php");

			  } catch(FacebookRequestException $e) {

			    echo "Exception occured, code: " . $e->getCode();
			    echo " with message: " . $e->getMessage();

			  }   



// require 'getUser.php';

// $UID = getUIDFromFBID($fbid,$connection);
// setcookie('user', $UID, time()+60*60*24*30, '/', "sociallyoutward.com", false);
// header("location: memberprofile.php");

?>