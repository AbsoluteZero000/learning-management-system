package com.els.util;

import jakarta.inject.Singleton;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.els.models.Enrollment;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class ExternalApiService {

    public String postDataToExternalApi(String url, Enrollment enrollment) throws Exception {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost request = new HttpPost(url);

        if (enrollment != null ) {
            ArrayList<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
            nameValuePairs.add(new BasicNameValuePair("id", enrollment.getId().toString()));
            nameValuePairs.add(new BasicNameValuePair("courseId", enrollment.getCourseid().toString()));
            nameValuePairs.add(new BasicNameValuePair("studentId", enrollment.getStudentid().toString()));
            nameValuePairs.add(new BasicNameValuePair("status", enrollment.getStatus()));

            request.setEntity(new UrlEncodedFormEntity(nameValuePairs));
        }

        CloseableHttpResponse response = httpClient.execute(request);

        try {
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                return EntityUtils.toString(entity);
            } else {
                return null;
            }
        } finally {
            response.close();
        }
    }
}
